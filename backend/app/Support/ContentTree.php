<?php

namespace App\Support;

class ContentTree
{
    /**
     * Flatten nested arrays into dotted key_path => string value pairs.
     *
     * @return array<string, string>
     */
    public static function flatten(mixed $value, string $prefix = ''): array
    {
        if (is_string($value)) {
            return $prefix !== '' ? [$prefix => $value] : [];
        }

        if (! is_array($value)) {
            return [];
        }

        $out = [];
        foreach ($value as $key => $child) {
            $next = $prefix === '' ? (string) $key : $prefix.'.'.$key;
            $out += self::flatten($child, $next);
        }

        return $out;
    }

    /**
     * Rebuild nested array from dotted key paths.
     *
     * @param  array<string, string|null>  $flat
     * @return array<string, mixed>
     */
    public static function nest(array $flat): array
    {
        $root = [];
        foreach ($flat as $path => $value) {
            $parts = explode('.', $path);
            $cursor = &$root;
            foreach ($parts as $i => $part) {
                if ($i === count($parts) - 1) {
                    $cursor[$part] = $value;
                } else {
                    if (! isset($cursor[$part]) || ! is_array($cursor[$part])) {
                        $cursor[$part] = [];
                    }
                    $cursor = &$cursor[$part];
                }
            }
            unset($cursor);
        }

        return $root;
    }
}
